import styled from 'styled-components'
import  {categoryArray}  from '../Pages/data'
import CategoriesItem from './CategoriesItem'
import { mobileDevice } from '../Responsive'
const Categories = () => {


  return (
    <Container>
        {
            categoryArray.map((item) => 
              <CategoriesItem item={item}  key={item.id}/>
            )
        }
    </Container>
  )
}

export default Categories


const Container = styled.div`
display: flex;
padding: 20px;
justify-content:space-between;
${mobileDevice({
   padding: "0px",
   flexDirection: "column"
  })}
`