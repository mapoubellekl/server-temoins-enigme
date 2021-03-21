"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Enigme = class Enigme {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Enigme.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Enigme.prototype, "year", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Enigme.prototype, "month", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Enigme.prototype, "found", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Enigme.prototype, "responseEnigme", void 0);
Enigme = __decorate([
    typeorm_1.Entity()
], Enigme);
exports.Enigme = Enigme;
//https://developer.okta.com/blog/2018/10/30/basic-crud-angular-and-node
//pas regardé https://malcoded.com/posts/angular-backend-express/
let connection;
function getEnigmeRepository() {
    return __awaiter(this, void 0, void 0, function* () {
        if (connection === undefined) {
            connection = yield typeorm_1.createConnection({
                type: 'sqlite',
                database: 'enigmeDB',
                synchronize: true,
                entities: [
                    Enigme
                ],
            });
        }
        return connection.getRepository(Enigme);
    });
}
exports.getEnigmeRepository = getEnigmeRepository;
