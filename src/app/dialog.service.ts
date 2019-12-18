export class DialogService {

    confirm(message?: string){
        return new Promise ( resolve => {
            return resolve(window.confirm(message || 'confirm'));
        })
    }
}