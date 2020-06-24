import * as React from "react";
import axios from "axios";

import Ticket from "../Ticket/Ticket";

interface State {
  id: String;
  tickets: Array<object>;
}

export default class Tickets extends React.Component<any, any> {
  state: State = {
    id: "",
    tickets: [],
  };

  async componentDidMount() {
    await this.getTicket();
  }

  getTicket() {
    axios
      .get("https://front-test.beta.aviasales.ru/search")
      .then((data: { data: { searchId: String } }) => {
        const { searchId } = data.data;

        this.setState(() => {
          return {
            id: searchId,
          };
        });

        if (this.state.id) {
          this.setTicket();
        } else {
          this.getTicket();
        }
      })
      .catch(() => this.getTicket());
  }

  setTicket() {
    axios
      .get(
        `https://front-test.beta.aviasales.ru/tickets?searchId=${this.state.id}`
      )
      .then((data: { data: { tickets: [] } }) => {
        this.setState(() => {
          return {
            tickets: [...data.data.tickets],
          };
        });
      })
      .catch(() => this.getTicket());
  }

  renderTicket() {
    const items = this.state.tickets.map((ticket: object, index: number) => {
      return <Ticket ticket={ticket} key={index} />;
    });

    return <ul className="tickets__list">{items}</ul>;
  }
  render() {
    return (
      <div className="tickets">
        Tickets
        {this.renderTicket()}
      </div>
    );
  }
}
