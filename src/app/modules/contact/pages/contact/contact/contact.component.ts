import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CoreUtilitiesService } from '@app/data/services/utilities/core-utilities.service';
import { NgxCrypticTextComponent } from '@omnedia/ngx-cryptic-text';
import { NgxShineBorderComponent } from '@omnedia/ngx-shine-border';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

enum FormState {
  INITIAL = 'INITIAL',
  SENDING = 'SENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgxShineBorderComponent,
    NgxCrypticTextComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  result: string | null = null;
  isSubmitted = false;
  formState: FormState = FormState.INITIAL;
  formStateEnum = FormState;

  constructor(private coreUtilities: CoreUtilitiesService) {}

  async onSubmit(form: any) {
    this.formState = FormState.SENDING;

    const formData = new FormData();
    formData.append('access_key', '2b8771bc-263d-4fe9-b48c-e807b9f27255');
    formData.append('name', form.value.name);
    formData.append('email', form.value.email);
    formData.append('message', form.value.message);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        this.coreUtilities.trackFormSuccess('Contact Form');

        this.result = 'Message Sent, I will get back to you soon!';
        this.isSubmitted = true;
        form.reset();
      } else {
        this.coreUtilities.trackFormError('Contact Form Error');

        this.result = 'Something went wrong. Please try again.';
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      this.coreUtilities.trackFormError('Contact Form Error');

      this.result = 'An error occurred. Please try again later.';
    }
  }
}
