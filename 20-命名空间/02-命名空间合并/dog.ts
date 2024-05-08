/// <reference path="animal.ts" />

declare namespace Animal {
  namespace Dog {
    function bark(): void

    function run(): void
  }
}

new Animal.ProtectedAnimals.Pig().run()
