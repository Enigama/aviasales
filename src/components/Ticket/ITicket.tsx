export default interface ITicketProps {
  ticket: {
    readonly price?: number,
    carrier?: string,
    segments?: Array<any>
  },
}
