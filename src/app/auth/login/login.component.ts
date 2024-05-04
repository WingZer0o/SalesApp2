import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { LoginDto } from "../../models/login/login-dto";
import { LoginResponseDto } from "../../models/login/login-response-dto";
import { MaterialModule } from "../../modules/material.module";
import { AuthGuardService } from "../../services/http/auth-guard.service";
import { LoginHttpService } from "../../services/http/login-http.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  standalone: true,
  imports: [ 
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;
  public isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginHttpService: LoginHttpService,
    private authGuardService: AuthGuardService,
    private router: Router
  ) {}

  ngOnInit() {
    // check if token exists in local storage. If it does, navigate to chat screen
    if (this.authGuardService.isTokenPresent()) {
      this.router.navigateByUrl("/chat");
    }
    
    this.form = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  public async submitUserLogin(): Promise<void> {
    try {
      this.isLoading = true;
      const postBody: LoginDto = new LoginDto(
        this.form.get("email")?.value,
        this.form.get("password")?.value,
      );
      const response: LoginResponseDto = await this.loginHttpService.login(
        postBody,
      );
      this.isLoading = false;
      this.authGuardService.setToken(response.token);
      this.router.navigateByUrl("/chat/main");
    } catch (error: any) {
      this.isLoading = false;
      console.log(error.error.errorMessage);
    }
  }
}
