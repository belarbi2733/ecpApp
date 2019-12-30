'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">easycp documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-a9815772bac484bbe798ec3f9c220fa3"' : 'data-target="#xs-components-links-module-AppModule-a9815772bac484bbe798ec3f9c220fa3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-a9815772bac484bbe798ec3f9c220fa3"' :
                                            'id="xs-components-links-module-AppModule-a9815772bac484bbe798ec3f9c220fa3"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-a9815772bac484bbe798ec3f9c220fa3"' : 'data-target="#xs-injectables-links-module-AppModule-a9815772bac484bbe798ec3f9c220fa3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-a9815772bac484bbe798ec3f9c220fa3"' :
                                        'id="xs-injectables-links-module-AppModule-a9815772bac484bbe798ec3f9c220fa3"' }>
                                        <li class="link">
                                            <a href="injectables/PositionService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PositionService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ServiceData.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ServiceData</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageModule.html" data-type="entity-link">LoginPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginPageModule-e059cfc328e2fb6df7520017d95ea000"' : 'data-target="#xs-components-links-module-LoginPageModule-e059cfc328e2fb6df7520017d95ea000"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-e059cfc328e2fb6df7520017d95ea000"' :
                                            'id="xs-components-links-module-LoginPageModule-e059cfc328e2fb6df7520017d95ea000"' }>
                                            <li class="link">
                                                <a href="components/LoginPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ModalComplaintPageModule.html" data-type="entity-link">ModalComplaintPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ModalComplaintPageModule-ae445708834120ddc46f55b68886d97f"' : 'data-target="#xs-components-links-module-ModalComplaintPageModule-ae445708834120ddc46f55b68886d97f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ModalComplaintPageModule-ae445708834120ddc46f55b68886d97f"' :
                                            'id="xs-components-links-module-ModalComplaintPageModule-ae445708834120ddc46f55b68886d97f"' }>
                                            <li class="link">
                                                <a href="components/ModalComplaintPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalComplaintPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalRatingPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalRatingPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ModalRatingPageModule.html" data-type="entity-link">ModalRatingPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ModalRatingPageModule-b43709223d45dd440429fbecae518cfd"' : 'data-target="#xs-components-links-module-ModalRatingPageModule-b43709223d45dd440429fbecae518cfd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ModalRatingPageModule-b43709223d45dd440429fbecae518cfd"' :
                                            'id="xs-components-links-module-ModalRatingPageModule-b43709223d45dd440429fbecae518cfd"' }>
                                            <li class="link">
                                                <a href="components/ModalRatingPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalRatingPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/QRCodePageModule.html" data-type="entity-link">QRCodePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-QRCodePageModule-806628d761ad0cb91c3a123f0af96aea"' : 'data-target="#xs-components-links-module-QRCodePageModule-806628d761ad0cb91c3a123f0af96aea"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-QRCodePageModule-806628d761ad0cb91c3a123f0af96aea"' :
                                            'id="xs-components-links-module-QRCodePageModule-806628d761ad0cb91c3a123f0af96aea"' }>
                                            <li class="link">
                                                <a href="components/QRCodePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QRCodePage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StepDetailPageModule.html" data-type="entity-link">StepDetailPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StepDetailPageModule-9667bf4211bffe342de2178d767bcfdb"' : 'data-target="#xs-components-links-module-StepDetailPageModule-9667bf4211bffe342de2178d767bcfdb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StepDetailPageModule-9667bf4211bffe342de2178d767bcfdb"' :
                                            'id="xs-components-links-module-StepDetailPageModule-9667bf4211bffe342de2178d767bcfdb"' }>
                                            <li class="link">
                                                <a href="components/StepDetailPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StepDetailPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/Tab3PageModule.html" data-type="entity-link">Tab3PageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-Tab3PageModule-4ddf3db1f34262bd98c6d8458b7902be"' : 'data-target="#xs-components-links-module-Tab3PageModule-4ddf3db1f34262bd98c6d8458b7902be"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-Tab3PageModule-4ddf3db1f34262bd98c6d8458b7902be"' :
                                            'id="xs-components-links-module-Tab3PageModule-4ddf3db1f34262bd98c6d8458b7902be"' }>
                                            <li class="link">
                                                <a href="components/Tab3Page.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Tab3Page</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageModule.html" data-type="entity-link">TabsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TabsPageModule-3656898057dac2d5b9e5645583e2a48d"' : 'data-target="#xs-components-links-module-TabsPageModule-3656898057dac2d5b9e5645583e2a48d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TabsPageModule-3656898057dac2d5b9e5645583e2a48d"' :
                                            'id="xs-components-links-module-TabsPageModule-3656898057dac2d5b9e5645583e2a48d"' }>
                                            <li class="link">
                                                <a href="components/TabsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TabsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TabsPageRoutingModule.html" data-type="entity-link">TabsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TrajetDetailPageModule.html" data-type="entity-link">TrajetDetailPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TrajetDetailPageModule-5e509ed5835f96a7369d94afdc4199b4"' : 'data-target="#xs-components-links-module-TrajetDetailPageModule-5e509ed5835f96a7369d94afdc4199b4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TrajetDetailPageModule-5e509ed5835f96a7369d94afdc4199b4"' :
                                            'id="xs-components-links-module-TrajetDetailPageModule-5e509ed5835f96a7369d94afdc4199b4"' }>
                                            <li class="link">
                                                <a href="components/ModalComplaintPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalComplaintPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalRatingPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalRatingPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrajetDetailPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TrajetDetailPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TrajetPageModule.html" data-type="entity-link">TrajetPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TrajetPageModule-333709e085a5b0eb70e46895c944f333"' : 'data-target="#xs-components-links-module-TrajetPageModule-333709e085a5b0eb70e46895c944f333"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TrajetPageModule-333709e085a5b0eb70e46895c944f333"' :
                                            'id="xs-components-links-module-TrajetPageModule-333709e085a5b0eb70e46895c944f333"' }>
                                            <li class="link">
                                                <a href="components/TrajetPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TrajetPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/TrajetDetailPage.html" data-type="entity-link">TrajetDetailPage</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ColisData.html" data-type="entity-link">ColisData</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PositionService.html" data-type="entity-link">PositionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ServiceData.html" data-type="entity-link">ServiceData</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TourneeData.html" data-type="entity-link">TourneeData</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TrajetData.html" data-type="entity-link">TrajetData</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserData.html" data-type="entity-link">UserData</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/TourneeOptions.html" data-type="entity-link">TourneeOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TrajetOptions.html" data-type="entity-link">TrajetOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserOptions.html" data-type="entity-link">UserOptions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});