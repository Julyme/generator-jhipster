<%#
 Copyright 2013-2017 the original author or authors from the JHipster project.

 This file is part of the JHipster project, see http://www.jhipster.tech/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-%>
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
<%_ if (authenticationType !== 'oauth2') { _%>
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
<%_ } _%>
import { JhiLanguageService } from 'ng-jhipster';

import { ProfileService } from '../profiles/profile.service';
import { <% if (enableTranslation) { %>JhiLanguageHelper, <% } %>Principal, <% if (authenticationType !== 'oauth2') { %>LoginModalService, <% } %>LoginService } from '../../shared';

import { VERSION } from '../../app.constants';

@Component({
    selector: '<%= jhiPrefixDashed %>-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        <%_ if (useSass) { _%>
        'navbar.scss'
        <%_ } else { _%>
        'navbar.css'
        <%_ } _%>
    ]
})
export class NavbarComponent implements OnInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    <%_ if (authenticationType !== 'oauth2') { _%>
    modalRef: NgbModalRef;
    <%_ } _%>
    version: string;

    constructor(
        private loginService: LoginService,
        <%_ if (enableTranslation) { _%>
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        <%_ } _%>
        private principal: Principal,
        <%_ if (authenticationType !== 'oauth2') { _%>
        private loginModalService: LoginModalService,
        <%_ } _%>
        private profileService: ProfileService,
        private router: Router
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngOnInit() {
        <%_ if (enableTranslation) { _%>
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });

        <%_ } _%>
        this.profileService.getProfileInfo().then((profileInfo) => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
    }

    <%_ if (enableTranslation) { _%>
    changeLanguage(languageKey: string) {
      this.languageService.changeLanguage(languageKey);
    }

    <%_ } _%>
    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        <%_ if (authenticationType !== 'oauth2') { _%>
        this.modalRef = this.loginModalService.open();
        <%_ } else { _%>
        this.loginService.login();
        <%_ } _%>
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }
}
