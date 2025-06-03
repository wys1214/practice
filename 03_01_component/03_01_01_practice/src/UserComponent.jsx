export default function UserComponent(props){

  const user = props.user;
  const name = user.name;
  const game = user.game;
  const from = user.from;

  return (
    <tr>
        <td>{name}</td>
        <td>{game}</td>
        <td>{from}</td>
    </tr>
  )
}