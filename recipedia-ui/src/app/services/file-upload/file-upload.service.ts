import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private _selectedPictureFile: any;
  private _selectedPictureString: string | undefined;

  constructor() {
  }

  onFileSelected(event: any): void {
    this._selectedPictureFile = event.target.files[0];
    console.log(this._selectedPictureFile);
    if (this._selectedPictureFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this._selectedPictureString = reader.result as string;
      };
      reader.readAsDataURL(this._selectedPictureFile);
    }
  }

  base64ToFile(base64String: string): File {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: 'image/jpeg'});

    return new File([blob], 'temporary-image' + base64String.substring(0, 10), {type: 'image/jpeg'});
  }

  getSelectedPictureFile(): any {
    return this._selectedPictureFile;
  }

  getSelectedPictureString(): string | undefined {
    return this._selectedPictureString;
  }

  set selectedPictureString(value: string | undefined) {
    this._selectedPictureString = value;
  }

  set selectedPictureFile(value: any) {
    this._selectedPictureFile = value;
  }
}
