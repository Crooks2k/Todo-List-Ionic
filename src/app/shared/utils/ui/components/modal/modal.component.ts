import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonModal } from '@ionic/angular';
import { ModalConfig } from './modal.config';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() size: 'small' | 'medium' | 'large' = ModalConfig.defaults.size;
  @Output() closeModal = new EventEmitter<void>();

  @ViewChild(IonModal) modal?: IonModal;

  public readonly config = ModalConfig;

  public onClose(): void {
    this.closeModal.emit();
  }

  public onBackdropClick(): void {
    this.onClose();
  }
}
