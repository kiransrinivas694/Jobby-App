import './index.css'

const Skills = props => {
  const {skills} = props
  console.log(skills)
  const updatedSkills = {
    imageUrl: skills.image_url,
    name: skills.name,
  }

  const {imageUrl, name} = updatedSkills

  return (
    <li className="skill-list-item">
      <img src={imageUrl} alt={name} className="skills-image" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default Skills
