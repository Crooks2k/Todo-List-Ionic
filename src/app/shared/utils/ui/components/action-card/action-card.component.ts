import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActionCardConfig } from './action-card.config';

@Component({
  selector: 'app-action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ActionCardComponent {
  @Input() icon: string = ActionCardConfig.defaults.icon;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() color: string = ActionCardConfig.defaults.color;
  @Output() cardClick = new EventEmitter<void>();

  public readonly config = ActionCardConfig;

  public onCardClick(): void {
    this.cardClick.emit();
  }
}
