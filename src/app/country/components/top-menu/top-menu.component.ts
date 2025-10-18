import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from "@angular/router";

@Component({
  selector: 'country-top-menu',
  imports: [RouterLinkActive, RouterLinkWithHref],
  templateUrl: './top-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopMenuComponent { }
