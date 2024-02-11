import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ICreateSubscriptionDto } from 'src/common/types/dto/subscription';
import { SUBSCRIPTION_TYPE } from 'src/common/types/enums/subscription';

export class CreateSubscriptionDto implements ICreateSubscriptionDto {
  @IsEnum(SUBSCRIPTION_TYPE)
  @IsNotEmpty()
  type: SUBSCRIPTION_TYPE;

  @IsString()
  @IsNotEmpty()
  subscriptionId: string;

  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
