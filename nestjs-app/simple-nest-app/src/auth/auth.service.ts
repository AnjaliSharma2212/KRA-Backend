import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken"
@Injectable()
export class AuthService {
  users: any[] = [];
  
  // Track login attempts: { [email]: { attempts: number, blockUntil: Date } }
  private loginAttempts = {};

  register(data) {
    this.users.push(data);
    return { message: 'User Registered' };
  }

  login(data) {
    const user = this.users.find(
      u => u.email === data.email && u.password === data.password
    );

    const now = new Date();

    // Initialize if first attempt
    if (!this.loginAttempts[data.email]) {
      this.loginAttempts[data.email] = { attempts: 0, blockUntil: null };
    }

    const attemptsInfo = this.loginAttempts[data.email];

    // Check if user is blocked
    if (attemptsInfo.blockUntil && now < attemptsInfo.blockUntil) {
      const remaining = Math.ceil((attemptsInfo.blockUntil.getTime() - now.getTime()) / 1000);
      return { message: `Account locked. Try again in ${remaining} seconds.` };
    }

    if (!user) {
      // Wrong credentials → increase attempts
      attemptsInfo.attempts += 1;

      // Lock user if attempts >= 3
      if (attemptsInfo.attempts >= 3) {
        attemptsInfo.blockUntil = new Date(now.getTime() + 10 * 60 * 1000); // 10 min
        attemptsInfo.attempts = 0; // reset after lock
        return { message: 'Too many failed attempts. Account locked for 10 minutes.' };
      }

      return { message: 'Invalid credentials' };
    }

    // Reset attempts on successful login
    attemptsInfo.attempts = 0;
    attemptsInfo.blockUntil = null;

    // Generate JWT
    const token = jwt.sign(user, 'secret', { expiresIn: '1h' }); // session limit 1h
    return { access_token: token };
  }

  getUsers() {
    return this.users;
  }
}