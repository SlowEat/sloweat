import '../../styles/user/NoMatch.css';

function NoMatch({title , description}) {
  return (
    <div className="nomatch-box" data-model-id="141:266-frame">
      <div className="nomatch-view">
        <img className="nomatch-frame" src="https://c.animaapp.com/f56cweRA/img/frame.svg" />
        <div className="nomatch-text-wrapper">{title}</div>
        <p className="nomatch-desc">{description}</p>
      </div>
    </div>
  );
}

export default NoMatch;
