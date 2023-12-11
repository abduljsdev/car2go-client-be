import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

const stripe = require('stripe')(
  'sk_test_51N0AOWFIB8VTBZ494AqtV7HetxOmfXZ7adGbN3I4GcPEtEvdupd5wfL1LHIWQ8aflFvIedKl65J9klsEV3OiASRc00NFFKk45J',
);

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: this.paymentService.calculateOrderAmount(createPaymentDto),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return paymentIntent.client_secret;
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
