import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit {
  // Declare the id property
  id;

  // Inject the route
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Grab the id for routing from the activated route snapshot
    this.id = this.route.snapshot.paramMap.get("id");
  }
}
