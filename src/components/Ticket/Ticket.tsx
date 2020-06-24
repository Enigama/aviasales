import * as React from 'react';
import './ticket.css';

interface ITicketProps {
  ticket: {
    readonly price?: number,
    carrier?: string,
    segments?: Array<ISegments>,
  },
}

interface ISegments {
  origin: string
  destination: string
  date: string
  stops: Array<string>,
  duration: number
}

const Ticket: React.FC<ITicketProps> = ({ticket}) => {
  const { price, carrier } = ticket;
  return(
    <li className="ticket">
      <div className="ticket__top">
        <div className="ticket__price">
          {price}
        </div>
        <div className="ticket__airline">
          <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt=""/>
        </div>
      </div>
      {
        ticket.segments?.map((item: ISegments, index: number) => {
          const {date, destination, duration, origin, stops} = item;
          const timeInterval: number = duration / 60;
          const fixedTime: Array<string> = timeInterval.toFixed(2).split('.');
          const resultTime: string = (timeInterval ^ 0) === timeInterval ? `${timeInterval}ч` : `${fixedTime[0]}ч ${fixedTime[1]}м`;
          console.log(duration, timeInterval);

          return(
            <div key={index} className="ticket__information">
              <div className="ticket__field">
                <div className="ticket__destination">
                  <div>{origin}</div>-<div>{destination}</div>
                </div>
                <div className="ticket__text">
                  {new Date(date).toLocaleString()}
                </div>
              </div>

              <div className="ticket__field">
                <div>{resultTime}</div>
                <div className="ticket__value"></div>
              </div>

              {
                stops.length ?
                  <div className="ticket__field">
                    <div className="ticket__destination">
                      {stops.length} пересадки
                    </div>
                    <div className="ticket__text">
                      {stops.map((stop: string, index: number) => {
                        const stopsCount = stops.length;
                          return(
                            <span key={index}>{
                              stops.length > 1 && stopsCount - 1 !== index ?
                                stop + ', '
                                :
                                stop
                            }</span>
                          )
                      })}
                    </div>
                  </div>
                :
                  null
              }
            </div>
          )
        })
      }
    </li>
  )
};

export default Ticket;
