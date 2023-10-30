import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { JwtModule } from "@nestjs/jwt";


@Module({
  imports: [JwtModule.register({
    global: true,
    secret: "KI8yXA9QBAEMG0dMZAApVv_R8vHjoyqRlLzG5kSlMuY",
    signOptions: { expiresIn: '60s' },
  }),],
  providers: [AuthService, AuthGuard],
})
export class AuthModule { }
