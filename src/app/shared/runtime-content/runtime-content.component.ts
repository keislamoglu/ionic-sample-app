import {
    Compiler,
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    Input,
    ModuleWithComponentFactories,
    NgModule,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

@Component({
    selector: 'app-runtime-content',
    template: `
        <div #container></div>`
})
export class RuntimeContentComponent implements OnInit {
    @Input() moduleMetadata: NgModule;

    @Input() template: string;

    @Input() context: any = {};

    @ViewChild('container', {read: ViewContainerRef})
    container: ViewContainerRef;

    private componentRef: ComponentRef<{}>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private compiler: Compiler) {
    }

    ngOnInit() {
        this.compileTemplate();
    }

    compileTemplate() {
        const metadata = {
            selector: `generated-component`,
            template: this.template
        };
        const factory = this.createComponentFactorySync(this.compiler, metadata);

        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }

        this.componentRef = this.container.createComponent(factory);
    }

    private createComponentFactorySync(compiler: Compiler, metadata: Component): ComponentFactory<any> {
        const component = MockContentComponent;
        component.prototype = {...component.prototype, ...this.context};
        const componentDecorator = Component(metadata);
        const decoratedComponent = componentDecorator(component);

        let moduleMetadata = this.moduleMetadata;
        if (!moduleMetadata) {
            moduleMetadata = {declarations: []};
        }
        if (!moduleMetadata.declarations) {
            moduleMetadata.declarations = [];
        }
        moduleMetadata.declarations.push(decoratedComponent);

        const moduleDecorator = NgModule(moduleMetadata);
        const decoratedModule = moduleDecorator(MockContentModule);

        const module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(decoratedModule);

        return module.componentFactories.find(f => f.componentType === decoratedComponent);
    }
}

class MockContentComponent {
}

class MockContentModule {
}
