function Link(props = { text, to }) {
  return (
    <a {...props} href={props.to} target='_blank'>
      {props.className === 'link' && <p className='link-icon'></p>}
      {props.text}
    </a>
  );
}

export default Link;
