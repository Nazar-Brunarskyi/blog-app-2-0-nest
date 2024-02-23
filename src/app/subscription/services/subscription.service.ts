import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Subscription } from '../schemas/subscription.schema';
import { CreateSubscriptionDto } from '../dto/create-subscription.dto';
import { User } from 'src/app/user/entities/user.entity';
// import { UpdateSubscriptionDto } from '../dto/update-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name)
    private subscriptionModel: mongoose.Model<Subscription>,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}
  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const { subscriptionId, type, customerId, userId } = createSubscriptionDto;

    const user = await this.userModel.findById(userId);

    const newSubscription = new this.subscriptionModel({
      stripeSubscriptionId: subscriptionId,
      type: type,
      customerId,
      userId: user,
      validUntil: null,
    });

    return newSubscription.save();
  }

  async updateSubscriptionValidity(subscriptionId: string, validUntil: Date) {
    const subscription = await this.subscriptionModel.findOne({
      stripeSubscriptionId: subscriptionId,
    });

    subscription.validUntil = validUntil;

    return subscription.save();
  }

  async remove(subscriptionId: string) {
    const subscription = await this.subscriptionModel.findOneAndDelete({
      stripeSubscriptionId: subscriptionId,
    });

    if (!subscription) {
      throw new NotFoundException(`Subscription is not found.`);
    }

    return subscription;
  }
}
