import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { enCodePassword } from "src/utils/helpers/generic-helper";
import { AuthService } from './auth.service';
import { ForgetPasswordDto } from "./dto/forget.password.dto";
import { UpdatePasswordDto } from "./dto/update.password.dto";
import { VerificationCodeDto } from "./dto/verification.code.dto";


@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService:AuthService
    ){}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req) {    
      return this.authService.login(req.user);
    }
    @Post('forget-password')
  forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetPasswordDto.email);
  }
  @Post('verification-code')
  @HttpCode(HttpStatus.OK)
  verificationCode(@Body() verificationCodeDto: VerificationCodeDto) {
    return this.authService.verificationCode(verificationCodeDto);
  }
  @Post('update-password')
  updatePassword(@Body() updatepasswordDto: UpdatePasswordDto) {
   
    updatepasswordDto.password = enCodePassword(updatepasswordDto.password);
  
    return this.authService.updatePassword(updatepasswordDto);
  }
}