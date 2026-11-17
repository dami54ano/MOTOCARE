import test from 'node:test';import assert from 'node:assert/strict';
import{boxes,motorcycles,money,isDemoCompatible}from '../src/catalog.js';
test('Vier Paketvarianten vorhanden',()=>assert.equal(boxes.length,4));
test('Alle Boxen haben positive Beispielpreise',()=>assert.ok(boxes.every(b=>b.price>0)));
test('Motorradprofile enthalten Hersteller Modell und Baujahr',()=>assert.ok(motorcycles.every(b=>b.brand&&b.model&&b.year>2000)));
test('Service-Box ohne geprüfte Teilefreigabe gesperrt',()=>{assert.equal(isDemoCompatible('SERVICE'),false);assert.equal(isDemoCompatible('WASH'),true)});
test('Schweizer Preisformat',()=>assert.equal(money(29.9),'CHF 29.90'));
