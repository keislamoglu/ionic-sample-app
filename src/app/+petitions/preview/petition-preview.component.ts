import {Component, Input, OnInit} from '@angular/core';
import {
    PetitionService,
    PetitionTemplateService,
    ProsecutionOfficeService,
    UserInfoService
} from '../../shared/services';
import {switchMap} from 'rxjs/operators';
import {ModalController} from '@ionic/angular';
import {Person, Petition, UserInfo} from '../../shared/entity';
import pdfMake from 'pdfMake/build/pdfmake';
import pdfFonts from 'pdfMake/build/vfs_fonts';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {File} from '@ionic-native/file/ngx';
import {CommonModule} from '@angular/common';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-petition-preview',
    templateUrl: './petition-preview.component.html',
})
export class PetitionPreviewComponent implements OnInit {
    @Input() id: string;
    petition: Petition;
    userInfo: UserInfo;
    context: any;
    template: string;
    moduleMetadata = {
        imports: [CommonModule]
    };

    constructor(private _petitionService: PetitionService,
                private _userInfoService: UserInfoService,
                private _petitionTemplateService: PetitionTemplateService,
                private _prosecutionOfficeService: ProsecutionOfficeService,
                private _modalController: ModalController,
                private _file: File,
                private _fileOpener: FileOpener) {
    }

    ngOnInit(): void {
        this._petitionService.get(this.id).pipe(
            switchMap(petition => {
                this.petition = petition;
                return this._petitionTemplateService.get(petition.petitionTemplateId);
            }),
            switchMap(template => {
                this.template = template.content;
                return this._userInfoService.getAll();
            })
        ).subscribe(userInfos => {
            this.userInfo = userInfos[0];
            this.createContext(JSON.parse(this.petition.fieldData));
        });
    }

    dismiss() {
        this._modalController.dismiss();
    }

    fullName(person: Person | UserInfo) {
        return [person.name, person.middlename, person.lastname].filter(x => x).join(' ');
    }

    createContext(fieldData: any) {
        this.context = fieldData;
        this.context.userInfo = this.userInfo;
        this.context.fullName = this.fullName;
    }

    async createPdf() {
        const docDefinition = {
            content: [
                '\n\n',
                {text: 'UZLAŞMA GÖRÜŞMESİNE DAVET MEKTUBU', alignment: 'center', style: 'heading'},
                '\n\n',
                {
                    text: [
                        {text: 'Uzlaştırma No: ', bold: true},
                        {text: this.context.caseFile.fileNo} // case file no
                    ]

                },
                {text: `Sayın ${this.fullName(this.context.claiment)}`, alignment: 'center', bold: true},
                {text: `(Adres: ${this.context.claiment.address}) `, italics: true, alignment: 'center'},
                '\n',
                `${this.context.prosecutionOffice.name} Cumhuriyet Başsavcılığı tarafından yürütülen yukarıda numarası belirtilen dosyada taraf olarak bulunmaktasınız. Soruşturma/kovuşturma konu suçun, 5271 sayılı CMK'nın 253 ve 254'üncü maddeleri gereğince uzlaşma kapsamındaki suçlardan olması nedeniyle, uzlaşma işlemlerinin yürütülebilmesi için Cumhuriyet Başsavcılığı Uzlaştırma Bürosu tarafından uzlaştırmacı olarak görevlendirilmiş bulunmaktayım.`,
                '\n',
                {
                    text: [
                        `Bu mektubu, uzlaşma görüşmelerini başlatmak için yazmaktayım. Mektubun ekinde uzlaşmanın mahiyeti ile uzlaşmayı kabul veya reddetmenin hukukî sonuçlarının bulunduğu `,
                        {text: `Uzlaşma Teklif Formu`, italics: true},
                        ` bulunmaktadır. Bu formu dikkatlice okumanızı tavsiye ederim. Açıklamamı istediğiniz bir husus var ise 3 günlük süre içerisinde mesai saatleri içerisinde aşağıda belirtilen telefon numarası üzerinden bana ulaşabilirsiniz.`,
                    ]
                },
                '\n',
                {
                    text: [
                        `Ceza Muhakemesinde Uzlaştırma Yönetmeliği'nin 30 ve 34/2'nci maddeleri gereğince; bu mektubun elinize geçmesinden itibaren `,
                        {text: `en geç 3 gün içinde`, bold: true},
                        ` tarafımla irtibata geçmeniz ve kararınızı bildirmeniz gerekmektedir. Bu süre içinde benimle irtibata geçmediğiniz takdirde uzlaşma teklifini reddetmiş sayılacağınızı hatırlatırım. Bu durumda soruşturma / kovuşturma işlemlerine kaldığı yerden devam edilecek ve bir daha uzlaşma usulü uygulanamayacaktır.`
                    ]
                },
                '\n',
                `Saygı ile bilgilerinize sunarım. ${new Date(this.context.date).toLocaleDateString()}`,
                '\n',
                {text: this.fullName(this.context.userInfo), alignment: 'right'},
                {text: `Uzlaştırmacı`, alignment: 'right'},
                '\n\n',
                {
                    text: [
                        {text: `Ek: `, bold: true}, `Uzlaştırma teklif formu`
                    ]
                },
                '\n\n',
                {text: `UZLAŞTIRMACI İLETİŞİM BİLGİLERİ:`, style: 'heading'},
                {
                    text: [
                        {text: `Adres  \t\t: `, bold: true},
                        this.context.userInfo.address
                    ]
                },
                {
                    text: [
                        {text: `Telefon\t\t: `, bold: true},
                        this.context.userInfo.phone
                    ]
                }
            ],
            styles: {
                heading: {
                    fontSize: 13,
                    bold: true,
                },
            }
        };
        const pdf = pdfMake.createPdf(docDefinition);
        pdf.download();
    }
}
