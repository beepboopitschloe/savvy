/**
 * dashboard/controller.js
 *
 * Controller for the Dashboard route.
 */

import angular from 'angular';

import Card from '../../api/card';

class DashboardController {
  constructor($scope) {
    // track DI'd variables
    this.$scope = $scope;

    // create some cards
    this.cards = [];
    this.newCardTitle = '';
    this.newCardBody = '';

    this.unsubscribe = Card.service.store.onChange(
			this.handleCardChange.bind(this)
		);
  }

  createCard() {
    let card = new Card({
      title: this.newCardTitle,
      body: this.newCardBody
    });

    Card.service.create(card);
  }

  saveCard(card) {
    Card.service.update(card);
  }

  deleteCard(card) {
    Card.service.delete(card); 
  }

  handleCardChange(cards) {
    console.info('got new cards', cards);

    this.$scope.$apply(() => {
      this.cards = cards;
    });
  }
}

export default ['$scope', DashboardController];
