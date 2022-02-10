import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
// Mat Form field & Mat Input work together, we require both for Inputs
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
@NgModule({
    imports:[MatButtonModule,MatSidenavModule,MatToolbarModule,MatProgressSpinnerModule,
        MatIconModule,MatListModule,MatTabsModule,MatDialogModule,MatInputModule,
        MatFormFieldModule,MatCardModule,MatSnackBarModule,MatTableModule,MatPaginatorModule,MatAutocompleteModule],
    exports:[MatButtonModule,MatSidenavModule,MatToolbarModule,MatProgressSpinnerModule,
        MatIconModule,MatListModule,MatTabsModule,MatDialogModule,MatInputModule,
        MatFormFieldModule,MatCardModule,MatSnackBarModule,MatTableModule,MatPaginatorModule,MatAutocompleteModule]
})
export class MaterialModule {}