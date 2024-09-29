import Spinner from 'react-bootstrap/Spinner';
export default function Loading() {
  return (
    <section>
       <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </section>
  )
}
