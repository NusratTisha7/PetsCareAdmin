import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { getPets } from "../api/pets";
let index = 1


const Pets = () => {
    let [pet, setPet] = useState([])

    useEffect(() => {
        pets()
    }, [])

    const pets = async()=>{
        await getPets(index).then(res => {
            setPet(res.data.response)
        })
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
        </Card>
    )
}
export default Pets

