import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {getCookie} from '../../cookieShtuff';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {PartService} from '../../services/part.service';
import {PartModel} from '../../models/part.model';

@Component({
  selector: 'app-record-form',
  imports: [
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatInput,
    RouterLink,
    RouterLinkActive,
    MatLabel
  ],
  templateUrl: './record-form.component.html',
  standalone: true,
  styleUrl: './record-form.component.css'
})
export class RecordFormComponent implements OnInit
{
  errorMessage: string = "";
  isNewPart: boolean = false;
  part: PartModel | null = null;
  modifiedPart: PartModel = {} as PartModel;
  record: any;
  id: string = '';
  table: string = '';
  recordKeys: any[] = [];
  recordForm: FormGroup = new FormGroup({
    partId: new FormControl("", [Validators.required]),
    partName: new FormControl("", [Validators.required]),
    partDescription: new FormControl(""),
    partCost: new FormControl("", [Validators.min(0)]),
    partQOH: new FormControl("", [Validators.min(0)]),
    vendorId: new FormControl("")
  });
  toastMessage: string = "";

  constructor(private router: Router, private route: ActivatedRoute, private partService: PartService)
  {
  }

  //Get cookie ('record') and turn into object
  ngOnInit()
  {
    if (!getCookie('employee-id'))
    {
      this.router.navigate(['/']);
    }
    // This makes sure they have chosen a row from the database to view.
    if (!getCookie('record') || !getCookie('table-name'))
    {
      this.router.navigate(['/database']);
    }

    // This is the record they clicked on's ID

    // This is the table they clicked on
    this.table = getCookie('table-name');
    this.record = JSON.parse(getCookie('record'));
    console.log("Record Clicked: ", this.record);
    this.getRecordKeys();

    const partId = this.route.snapshot.paramMap.get('partId');
    if (partId)
    {
      this.isNewPart = false;
      this.partService.getPartById(+partId).subscribe({
        next: (data) =>
        {
          this.part = data;
          this.modifiedPart = {...data};
          this.recordForm.get("partId")?.setValue(`${data.partId}`);
          this.recordForm.get("partName")?.setValue(data.partName);
          this.recordForm.get("partDescription")?.setValue(`${data.partDescription}`);
          this.recordForm.get("partCost")?.setValue(data.partCost);
          this.recordForm.get("partQOH")?.setValue(data.partQOH);
          this.recordForm.get("vendorId")?.setValue(data.vendorId);

        },
        error: (error) =>
        {
          this.errorMessage = "Error fetching product";
        }
      });
    }
  }

  getRecordKeys()
  {
    this.recordKeys = Object.keys(this.record);
    console.log(this.recordKeys);
  }

  saveChanges(): void
  {
    this.modifiedPart.partId = this.recordForm.value.partId;
    this.modifiedPart.partName = this.recordForm.value.partName;
    this.modifiedPart.partDescription = this.recordForm.value.partDescription;
    this.modifiedPart.partCost = this.recordForm.value.partCost;
    this.modifiedPart.partQOH = this.recordForm.value.partQOH;
    this.modifiedPart.vendorId = this.recordForm.value.vendorId;
    if (this.isNewPart)
    {
      this.partService.createPart(this.modifiedPart).subscribe({
        next: () =>
        {
          this.toastMessage = "Changes have been saved. Have a TechNickal Day!";
        },
        error: (error) =>
        {
          this.toastMessage = "Changes not saved. Do not have a TechNickal Day.";
        }
      });
    }
    else
    {
      this.partService.updatePart(this.part!.partId, this.modifiedPart).subscribe({
        next: () =>
        {
          this.toastMessage = "Updates have been saved. Have a TechNickal Day!";
        },
        error: (error) =>
        {
          this.toastMessage = "Updates not saved. Do not have a TechNickal Day.";
        }
      });
    }
  }

}

