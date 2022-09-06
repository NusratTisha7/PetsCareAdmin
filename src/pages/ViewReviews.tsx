import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table, Button } from "react-bootstrap";
import { productReview,hideReview } from "../api/review";
import { useParams } from "react-router-dom";

const ViewReviews = () => {
  let [review, setReview] = useState([])
  let { id } = useParams();

  useEffect(() => {
    reviewInit()
  }, [])

  const reviewInit = ()=>{
    let data = {
      searchTrm: "productID",
      value: id
    }
    productReview(data).then(res => {
      setReview(res.data.response)
    })
  }

  const hide = (reviewId: any) => {
    return (event: React.MouseEvent) => {
      let data = {
        activeStatus: 0,
        id: reviewId
      }
      
      hideReview(data).then(res=>reviewInit())
    }
  }


  console.log(review)

  return (
    <Card className='p-5'>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Email</th>
            <th>Rating</th>
            <th>Review</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {review && review.map((item: any, index) => (
            <tr key={index}>
              <td>{item.email}</td>
              <td>{item.rating}</td>
              <td>{item.review}</td>
              {item.isActive===1 &&(
                <td><Button onClick={hide(item.id)}>Hide</Button></td>
              )}
              {item.isActive===0 &&(
                <td><Button>Hidden</Button></td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  )
}
export default ViewReviews

