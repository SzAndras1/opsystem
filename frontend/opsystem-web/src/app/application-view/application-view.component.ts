import {Component, OnInit} from '@angular/core';
import {ApplicationDto, ApplicationService} from "../generated";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-application-view',
  standalone: true,
  imports: [],
  templateUrl: './application-view.component.html',
  styleUrl: './application-view.component.scss'
})
export class ApplicationViewComponent implements OnInit {
  applicationDto!: ApplicationDto;
  appId: string;
  constructor(private applicationService: ApplicationService,
              private activatedRoute: ActivatedRoute) {
    this.appId = this.activatedRoute.snapshot.params['appId'];
  }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot);
    this.applicationService.getApplication(this.appId).subscribe((applicationDto: ApplicationDto) => this.applicationDto = applicationDto);
  }
}
