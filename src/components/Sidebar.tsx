import { CalendarIcon, EditIcon } from '@chakra-ui/icons'
import { List, ListIcon, ListItem } from '@chakra-ui/layout'
import { NavLink } from 'react-router-dom'
export const Sidebar = () => {
  return (
    <List fontSize="1.2em" spacing={4}>
      <ListItem>
        <NavLink to="/dashboard">
          <ListIcon as={CalendarIcon} color="white" />
          Додати вакансію
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink to="/create">
          <ListIcon as={EditIcon} color="white" />
          Усі вакансії
        </NavLink>
      </ListItem>
    </List>
  )
}
