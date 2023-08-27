export default function ContentEditable({ ...props }) {
  return <span className={props.className} id={props.id} role="textbox" contentEditable {...props}></span>;
}
