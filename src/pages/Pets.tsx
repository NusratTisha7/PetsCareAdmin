import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { getPets } from "../api/pets";
let index = 1


const Pets = () => {
    let [pet, setPet] = useState([])
    let [nextDisbale, setNextDisable] = useState(false)
    let [prevDisbale, setPrevDisable] = useState(false)

    useEffect(() => {
        pets()
    }, [])

    const pets = async()=>{
        await getPets(index).then(res => {
            setPet(res.data.response)
        })
    }

    const prev = () => {
        setNextDisable(false)
        if (index - 1 > 0) {
            index -= 1
            pets()
        } else {
            index = 1
            setPrevDisable(true)
        }
    }

    const next = () => {
        setPrevDisable(false)
        index += 1
        pets()
    }

    return (
        <Card className='p-5'>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Breed</th>
                        <th>Birth Date</th>
                        <th>Gender</th>
                        <th>Weight</th>
                    </tr>
                </thead>
                <tbody>
                    {pet && pet.map((item: any, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.breed}</td>
                            <td>{item.birthDate}</td>
                            <td>{item.gender}</td>
                            <td>{item.weight}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <nav aria-label="Page navigation example">
            <button disabled={prevDisbale} onClick={prev}  aria-label="Previous"> <span aria-hidden="true" >&laquo;</span> </button>
            <button  aria-label="Previous" disabled={nextDisbale} onClick={next}> <span aria-hidden="true" >&raquo;</span> </button>
            </nav>
        </Card>
    )
}
export default Pets

