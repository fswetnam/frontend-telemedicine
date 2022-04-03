import { Component } from '@angular/core';
import { DayService, WeekService, MonthService, AgendaService, EventSettingsModel, ActionEventArgs, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { DatePipe } from '@angular/common';
@Component({
  selector: "app-adminapp",
  templateUrl: "./adminapp.component.html",
  providers: [DayService, WeekService, MonthService, AgendaService, DatePipe],
  // specifies the template string for the Schedule component
  template: `<ejs-schedule></ejs-schedule>`
})
export class AdminappComponent {
  public data: object [] = [{
   
      }];
      public selectedDate: Date = new Date();
      public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    fields: {
      id: 'id',
      subject: { name: 'Subject', title: 'Event Name' },
      description: { name: 'Description', title: 'Event Description' },
      startTime: { name: 'StartTime', title: 'Start Duration' },
      endTime: { name: 'EndTime', title: 'End Duration'  }
    }
      };

      public scheduleObj: ScheduleComponent;

      onPopupOpen(args) {
        console.log("popUp args", args.data);
        console.log("getEvent result", this.scheduleObj.getEvents(args.data));
      }
    
      onActionComplete(args: ActionEventArgs): void {
        console.log("actionComplete", args.requestType, args);
    
        switch (args.requestType) {
          case "viewNavigate":
          case "dateNavigate":
            this.scheduleObj.refresh();
            break;
          case "toolBarItemRendered":
            break;
          default:
        }
    }

    openNav(){
      document.getElementById("mysideBar").style.width = "400px";
      document.getElementById("main").style.marginLeft = "400px";
    }
  
    closeNav(){
      document.getElementById("mysideBar").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
    }
    
  }