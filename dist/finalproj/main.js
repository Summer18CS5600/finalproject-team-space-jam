(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: "<router-outlet></router-outlet>",
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _app_routing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.routing */ "./src/app/app.routing.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _services_board_service_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/board.service.client */ "./src/app/services/board.service.client.ts");
/* harmony import */ var _components_board_board_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/board/board.component */ "./src/app/components/board/board.component.ts");
/* harmony import */ var _services_cacheset_service_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/cacheset.service.client */ "./src/app/services/cacheset.service.client.ts");
/* harmony import */ var _components_cacheset_cacheset_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/cacheset/cacheset.component */ "./src/app/components/cacheset/cacheset.component.ts");
/* harmony import */ var _services_process_service_client__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./services/process.service.client */ "./src/app/services/process.service.client.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











// add client side services to providers
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _components_board_board_component__WEBPACK_IMPORTED_MODULE_7__["BoardComponent"],
                _components_cacheset_cacheset_component__WEBPACK_IMPORTED_MODULE_9__["CachesetComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_4__["HttpModule"],
                _app_routing__WEBPACK_IMPORTED_MODULE_0__["Routing"]
            ],
            providers: [
                _services_board_service_client__WEBPACK_IMPORTED_MODULE_6__["BoardService"],
                _services_cacheset_service_client__WEBPACK_IMPORTED_MODULE_8__["CacheSetService"],
                _services_process_service_client__WEBPACK_IMPORTED_MODULE_10__["ProcessService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routing.ts":
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/*! exports provided: Routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Routing", function() { return Routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components_board_board_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/board/board.component */ "./src/app/components/board/board.component.ts");
// Import components


var APP_ROUTES = [
    { path: '', component: _components_board_board_component__WEBPACK_IMPORTED_MODULE_1__["BoardComponent"] },
    { path: 'board', component: _components_board_board_component__WEBPACK_IMPORTED_MODULE_1__["BoardComponent"] }
];
// Export the routes as module providers
var Routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(APP_ROUTES);


/***/ }),

/***/ "./src/app/components/board/board.component.css":
/*!******************************************************!*\
  !*** ./src/app/components/board/board.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "td {\n  background-color: black;\n\n\n}\ntr {\n  background-color: black;\n\n\n}\n"

/***/ }),

/***/ "./src/app/components/board/board.component.html":
/*!*******************************************************!*\
  !*** ./src/app/components/board/board.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "board.component\n\n<div *ngFor=\"let gameNumber of gameNumbers\">\n  <!--{{gameNumber['value']}}-->\n</div>\n\n<!--<a (click)=\"initializeBoard(31)\">Initialize Board</a>-->\n<!--<a (click)=\"renderTable()\">Create Board</a>-->\n<!--<a (click)=\"findBoard(31)\">Find a board test</a>-->\n<form (ngSubmit)=\"boardInput(bNum.value)\" #f=\"ngForm\">\n  Input Board Number:\n  <input\n    name=\"bNum\"\n    id=\"bNum\"\n    type=\"text\"\n    placeholder=\"31\"\n    class=\"form-control\"\n    ngModel\n    required\n    #bNum=\"ngModel\"\n  />\n  <input\n           class=\"button\"\n           type=\"submit\"/>\n</form>\n<form>\n  Input Process ID:\n  <input\n    name=\"pid\"\n    id=\"pid\"\n    type=\"text\"\n    placeholder=\"23\"\n    class=\"form-control\"\n    ngModel\n    required\n    #pid=\"ngModel\"\n  />\n  <input (click)=\"getPid(pid.value)\"\n         class=\"button\"\n         type=\"submit\"\n  />\n</form>\n\n<div class=\"container-fluid\">\n  <div *ngIf=\"errorFlag\"\n       class=\"alert alert-danger\">\n    {{errorMessage}}\n  </div>\n</div>\n\n<h1>Your Cache Line to find and complete: </h1>\n<div *ngFor=\"let process of processCache\" style=\"border:solid; display: inline\">\n  <div *ngIf=\"process.found === 0; then thenBlock; else elseBlock\"></div>\n  <ng-template #thenBlock><span style=\"background: lightgreen;\"> {{process.value}}</span></ng-template>\n  <ng-template #elseBlock><span style=\"background: red\">{{process.value}}</span></ng-template>\n</div>\n<button\n  *ngIf=\"processCache != null\"\n  (click)=\"resetProcess()\"\n  class=\"button\"\n  type=\"submit\"\n> Reset Process </button>\n\n"

/***/ }),

/***/ "./src/app/components/board/board.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/board/board.component.ts ***!
  \*****************************************************/
/*! exports provided: BoardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoardComponent", function() { return BoardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_board_service_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/board.service.client */ "./src/app/services/board.service.client.ts");
/* harmony import */ var rxjs_Rx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/Rx */ "./node_modules/rxjs-compat/_esm5/Rx.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_process_service_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/process.service.client */ "./src/app/services/process.service.client.ts");
/* harmony import */ var _services_cacheset_service_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/cacheset.service.client */ "./src/app/services/cacheset.service.client.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var BoardComponent = /** @class */ (function () {
    function BoardComponent(router, boardService, processService, cacheService) {
        this.router = router;
        this.boardService = boardService;
        this.processService = processService;
        this.cacheService = cacheService;
        this.subscription = new rxjs_Rx__WEBPACK_IMPORTED_MODULE_3__["Subscription"]();
    }
    /* Refresh the gameBoard every 1 second*/
    BoardComponent.prototype.ngOnInit = function () {
        this.startedRefresh = false;
        this.body = document.getElementsByTagName('body')[0];
        this.time = 0;
    };
    /* Get user input for board number and use that to initialize and render the table */
    BoardComponent.prototype.boardInput = function (num) {
        this.bNum = num;
        this.boardId = num;
        console.log("NUM: ", num);
        console.log("bNUm: ", this.bNum);
        this.initializeBoard(this.bNum);
        // this.renderTable();
    };
    BoardComponent.prototype.getPid = function (num) {
        var _this = this;
        this.pid = num;
        console.log("PID ", this.pid);
        this.processService.findProcessById(this.pid)
            .subscribe(function (process) {
            _this.processCache = process.processCache;
            // console.log("INSIDE THE SUBSCRIBE ", process);
            // console.log("PROCESS CACHE: ", this.processCache);
        });
    };
    /* Being the refresh for the page */
    BoardComponent.prototype.startRefresh = function () {
        var _this = this;
        this.startedRefresh = true;
        if (this.boardId != null) {
            console.log("INSIDE: ", this.boardId);
            this.interval = setInterval(function () {
                _this.refresh();
            }, 1000);
        }
    };
    /* Refresh the page, calling the findBoard function so that all players have updated gameBoards */
    BoardComponent.prototype.refresh = function () {
        var _this = this;
        //console.log("REFRESHING: ", this.time);
        this.time = this.time + 5;
        this.boardService.findBoard(this.boardId)
            .subscribe(function (board) {
            // console.log("ARE WE GETTING A BOARD?!");
            _this.gameNumbers = board.numbers;
            _this.tbl.remove();
            // this.body.removeChild(this.tbl);
            _this.renderTable();
        });
    };
    /**
     * Initializes a Game Board. Currently this is needed to be done before we can hit render for the first time.
     * @param boardId
     */
    BoardComponent.prototype.initializeBoard = function (boardId) {
        var _this = this;
        this.boardId = boardId;
        console.log('initializing');
        // Make a board.
        var nums = [];
        var i = 0;
        var cacheLine = 0;
        var cacheCounter = 0;
        for (i = 0; i < 100; i++) {
            if (cacheCounter > 3) {
                cacheLine += 1;
                cacheCounter = 0;
            }
            nums.push({ position: 99 - i, value: i, cacheLine: cacheLine, hidden: true, locked: false });
            cacheCounter += 1;
        }
        this.exampleBoard = { id: boardId,
            numbers: nums
        };
        // Initialize the board in the database/server.
        this.boardService.initializeBoard(boardId, this.exampleBoard).subscribe(function (game) {
            //console.log(game);
            _this.gameNumbers = game.numbers; // This should get removed once we put in boardId (probably)
            console.log(_this.gameNumbers);
            _this.renderTable();
        });
        //Initialize the cache in the database/server.
        console.log("running initialize cache call from component");
        this.cacheService.initializeCache(boardId).subscribe(function (cache) {
            console.log("cache should be initalized. in the board component");
            console.log(cache);
        });
    };
    /**
     * Find the number who's position equals the given parameter.
     * @param position
     * @returns the Value and Hidden Flag, may later expand to have it also include the cacheLine
     */
    BoardComponent.prototype.findThisNumber = function (position) {
        //console.log("entering find This number");
        for (var i = 0; i < this.gameNumbers.length; i++) {
            if (this.gameNumbers[i]['position'] === position) {
                return { value: this.gameNumbers[i]['value'], hidden: this.gameNumbers[i]['hidden'] };
            }
        }
    };
    BoardComponent.prototype.findBoard = function (boardId) {
        var _this = this;
        this.boardId = boardId;
        console.log("looking for a board");
        this.boardService.findBoard(boardId).subscribe(function (board) {
            _this.gameNumbers = board.numbers;
        });
    };
    /**
     * Creates (HTML-wise) and Renders the table to the screen.
     *
     * Note: In the future, I'm thinking we should give this a boardId as a parameter, so it can
     * fetch the board from the db to render.
     */
    BoardComponent.prototype.renderTable = function () {
        var _this = this;
        this.tbl = document.createElement('table');
        this.tbl.style.width = '50%';
        this.tbl.setAttribute('border', '1');
        var tbdy = document.createElement('tbody');
        for (var i = 0; i < 10; i++) {
            var tr = document.createElement('tr');
            for (var j = 0; j < 10; j++) {
                // console.log('J is now: ' + j);
                if (i === 10 && j === 10) {
                    break;
                }
                else {
                    var td = document.createElement('td');
                    var pos = null;
                    if (i === 0) {
                        pos = j;
                    }
                    else {
                        pos = i * 10 + j;
                    }
                    // console.log('the pos ' + pos);
                    // Currently a dict with {value: x, hidden: bool}
                    var data = this.findThisNumber(pos);
                    td.appendChild(document.createTextNode(data['value']));
                    // Change the background color based on hidden bool
                    if (data['hidden']) {
                        td.style.backgroundColor = '#000000';
                    }
                    else {
                        td.style.backgroundColor = 'white';
                    }
                    td.style.textAlign = 'center';
                    td.style.webkitTextFillColor = '#000000';
                    td.addEventListener("click", this.tileClick);
                    td.addEventListener("click", function (e) {
                        //console.log("WHAT IS e", e.target.toString());
                        _this.accessMemory(e);
                        // var process = {};
                        // for (let i = 0; i < this.processCache.length; ++i) {
                        //   console.log("INSIDE FOR LOOP");
                        //   if(this.processCache[i]['value'] === e.target.valueOf()) {
                        //     process = {value: this.processCache[i]['value'], found: 1};
                        //     this.processCache.splice(i, 1, process);
                        //     //this.processCache[i] = process;
                        //   }
                        // }
                        // console.log(this.processCache);
                    });
                    tr.appendChild(td);
                }
            }
            tbdy.appendChild(tr);
        }
        this.tbl.appendChild(tbdy);
        this.body.appendChild(this.tbl);
        if (this.startedRefresh == false) {
            this.startRefresh();
        }
    };
    /**
    * Represents what happens when we click a tile. Currently used to highlight the tile by changing the background color.
    * @param e represents the mouse event.
    */
    BoardComponent.prototype.tileClick = function (e) {
        // e.target.style.backgroundColor = 'white'; This shouldn't be necessary once we implement rendering every 'x' seconds.
        console.log("You clicked on " + e.target.textContent);
        var currentNum = e.target.textContent;
        //var currentCacheLine = this.findThisNumbersCacheLine(currentNum);
        var currentCacheLine = null;
    };
    BoardComponent.prototype.accessMemory = function (e) {
        var _this = this;
        var value = { value: e.target.textContent };
        console.log("umm.." + value.value);
        var process = {};
        this.errorFlag = false;
        for (var i = 0; i < 10; i++) {
            //console.log("INSIDE FOR LOOP", this.processCache[i]['value'] == e.target.textContent);
            if (this.processCache[i]['value'] == e.target.textContent) {
                if (i != 0) {
                    if (this.processCache[i - 1]['found'] != 1) {
                        this.errorFlag = true;
                        this.errorMessage = "You must finish your cache line in order!";
                    }
                }
                if (!this.errorFlag) {
                    process = { value: this.processCache[i]['value'], found: 1 };
                    //console.log(process);
                    this.processService.updateProcess(this.pid, process)
                        .subscribe(function (status) {
                        //console.log(status);
                        _this.processService.findProcessById(_this.pid)
                            .subscribe(function (process1) {
                            //console.log("RETURNED PROCESS ", process1);
                            _this.processCache = process1.processCache;
                            //console.log(this.processCache);
                        });
                    });
                    //this.processCache.splice(i, 1, process);
                    //this.processCache[i] = process;
                }
            }
        }
        //console.log(this.processCache);
        this.boardService.accessMemory(this.boardId, value).subscribe(function (board) {
            _this.gameNumbers = board.numbers; // This should get removed once we put in boardId (probably)
            //console.log(this.gameNumbers)
        });
    };
    BoardComponent.prototype.resetProcess = function () {
        var _this = this;
        var processToUpdate = {};
        var count1 = 0;
        var count2 = 0;
        console.log('PROCESS LIST LEN', this.processCache.length);
        var _loop_1 = function (i) {
            if (this_1.processCache[i]['found'] == 1) {
                count1++;
                processToUpdate = { value: this_1.processCache[i]['value'], found: 0 };
                console.log(processToUpdate);
                this_1.processService.updateProcess(this_1.pid, processToUpdate)
                    .subscribe(function (status) {
                    count2++;
                    console.log("HOW MANY TIMES", i);
                    console.log("STATUS", status);
                    // if(status) {
                    //   count++;
                    //   console.log("IN STATUS", count);
                    // }
                    console.log(count1);
                    console.log(count2);
                    if (count1 == count2) {
                        console.log(count1);
                        console.log(count2);
                        console.log("FINAL I", i);
                        _this.processService.findProcessById(_this.pid)
                            .subscribe(function (process) {
                            _this.processCache = process.processCache;
                        });
                    }
                });
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.processCache.length; i++) {
            _loop_1(i);
        }
        //waits(5000);
        // if(count >= 10) {
        //   this.processService.findProcessById(this.pid)
        //     .subscribe((process: any) => {
        //       this.processCache = process.processCache;
        //       //componentRefresh();
        //       //this.startRefresh();
        //       console.log(this.processCache);
        //     });
        // }
        //console.log(this.processCache);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('f'),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgForm"])
    ], BoardComponent.prototype, "boardInputForm", void 0);
    BoardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-board',
            template: __webpack_require__(/*! ./board.component.html */ "./src/app/components/board/board.component.html"),
            styles: [__webpack_require__(/*! ./board.component.css */ "./src/app/components/board/board.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _services_board_service_client__WEBPACK_IMPORTED_MODULE_2__["BoardService"], _services_process_service_client__WEBPACK_IMPORTED_MODULE_5__["ProcessService"], _services_cacheset_service_client__WEBPACK_IMPORTED_MODULE_6__["CacheSetService"]])
    ], BoardComponent);
    return BoardComponent;
}());



/***/ }),

/***/ "./src/app/components/cacheset/cacheset.component.css":
/*!************************************************************!*\
  !*** ./src/app/components/cacheset/cacheset.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/cacheset/cacheset.component.html":
/*!*************************************************************!*\
  !*** ./src/app/components/cacheset/cacheset.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  cacheset works!\n</p>\n\n<h1> Cache </h1>\n"

/***/ }),

/***/ "./src/app/components/cacheset/cacheset.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/cacheset/cacheset.component.ts ***!
  \***********************************************************/
/*! exports provided: CachesetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CachesetComponent", function() { return CachesetComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_cacheset_service_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/cacheset.service.client */ "./src/app/services/cacheset.service.client.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CachesetComponent = /** @class */ (function () {
    function CachesetComponent(router, cacheSetService) {
        this.router = router;
        this.cacheSetService = cacheSetService;
    }
    CachesetComponent.prototype.ngOnInit = function () {
    };
    CachesetComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-cacheset',
            template: __webpack_require__(/*! ./cacheset.component.html */ "./src/app/components/cacheset/cacheset.component.html"),
            styles: [__webpack_require__(/*! ./cacheset.component.css */ "./src/app/components/cacheset/cacheset.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _services_cacheset_service_client__WEBPACK_IMPORTED_MODULE_2__["CacheSetService"]])
    ], CachesetComponent);
    return CachesetComponent;
}());



/***/ }),

/***/ "./src/app/services/board.service.client.ts":
/*!**************************************************!*\
  !*** ./src/app/services/board.service.client.ts ***!
  \**************************************************/
/*! exports provided: BoardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoardService", function() { return BoardService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_Rx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/Rx */ "./node_modules/rxjs-compat/_esm5/Rx.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BoardService = /** @class */ (function () {
    function BoardService(http) {
        this.http = http;
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl;
    }
    BoardService.prototype.findBoard = function (boardId) {
        var url = this.baseUrl + '/api/game/' + boardId;
        return this.http.get(url).map(function (response) {
            return response.json();
        });
    };
    BoardService.prototype.initializeBoard = function (boardId, exampleBoard) {
        var url = this.baseUrl + '/api/game/' + boardId;
        return this.http.post(url, exampleBoard).map(function (response) {
            return response.json();
        });
    };
    BoardService.prototype.accessMemory = function (boardId, val) {
        console.log("in client service. value is : " + val.value);
        var url = this.baseUrl + '/api/game/' + boardId + '/accessMemory';
        return this.http.post(url, val).map(function (response) {
            return response.json();
        });
    };
    BoardService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_3__["Http"]])
    ], BoardService);
    return BoardService;
}());



/***/ }),

/***/ "./src/app/services/cacheset.service.client.ts":
/*!*****************************************************!*\
  !*** ./src/app/services/cacheset.service.client.ts ***!
  \*****************************************************/
/*! exports provided: CacheSetService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CacheSetService", function() { return CacheSetService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_Rx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/Rx */ "./node_modules/rxjs-compat/_esm5/Rx.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CacheSetService = /** @class */ (function () {
    function CacheSetService(http) {
        this.http = http;
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl;
    }
    CacheSetService.prototype.initializeCache = function (boardId) {
        console.log("at the client cache server");
        var url = this.baseUrl + '/api/cache/create/' + boardId;
        console.log(url);
        var emptybody = {};
        return this.http.post(url, emptybody).map(function (response) {
            console.log("getting back from the post");
            return response.json();
        });
    };
    CacheSetService.prototype.zinitializeBoard = function (boardId, exampleBoard) {
        var url = this.baseUrl + '/api/game/' + boardId;
        return this.http.post(url, exampleBoard).map(function (response) {
            return response.json();
        });
    };
    CacheSetService.prototype.findCache = function (boardId) {
        var url = this.baseUrl + '/api/cache/' + boardId;
        return this.http.get(url).map(function (response) {
            return response.json();
        });
    };
    CacheSetService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_3__["Http"]])
    ], CacheSetService);
    return CacheSetService;
}());



/***/ }),

/***/ "./src/app/services/process.service.client.ts":
/*!****************************************************!*\
  !*** ./src/app/services/process.service.client.ts ***!
  \****************************************************/
/*! exports provided: ProcessService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProcessService", function() { return ProcessService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_Rx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/Rx */ "./node_modules/rxjs-compat/_esm5/Rx.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProcessService = /** @class */ (function () {
    function ProcessService(http) {
        this.http = http;
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].baseUrl;
    }
    ProcessService.prototype.findProcessById = function (pid) {
        //console.log("IN FIND PROCESS BY ID CLIENT");
        var url = this.baseUrl + '/api/process/' + pid;
        return this.http.get(url)
            .map(function (response) {
            return response.json();
        });
    };
    ProcessService.prototype.createProcess = function (process) {
        var url = this.baseUrl + '/api/process';
        return this.http.post(url, process)
            .map(function (response) {
            return response.json();
        });
    };
    ProcessService.prototype.updateProcess = function (pid, process) {
        // console.log("ARE WE GETTING TO UPDATE?!");
        var url = this.baseUrl + '/api/process/' + pid;
        return this.http.put(url, process)
            .map(function (response) {
            return response.json();
        });
    };
    ProcessService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_3__["Http"]])
    ], ProcessService);
    return ProcessService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
var environment = {
    production: false,
    baseUrl: 'http://localhost:3100' //
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/aj/code/finalproject-team-space-jam/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map