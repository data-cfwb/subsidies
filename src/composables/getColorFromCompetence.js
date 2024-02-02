// Nom 	RVB 	CMJN 	Hex
// Aide à la jeunesse 	133 195 142 	53 1 55 0 	#85C38E #85C38E
// Recherche scientifique 	66 160 158 	72 17 40 2 	#42A09E #42A09E
// Enseignement 	58 151 201 	73 27 8 0 	#3A97C9 #3A97C9
// Maison de Justice 	190 128 182 	29 58 0 0 	#BE80B6 #BE80B6
// Culture 	227 114 118 	6 67 43 0 	#E37276 #E37276
// Adeps 	237 158 65 	5 44 80 0 	#ED9E41 #ED9E41
// Source https://github.com/data-cfwb/charte-graphique/
export function getColorFromCompetence(competence) {
  switch (competence) {
  case 'Education':
    return '#42A09E';
  case 'Enseignement supérieur et recherche':
    return '#42A09E';
  case 'Education permanente':
    return '#4A5563';
  case 'Culture':
    return '#E37276';
  case 'Médias':
    return '#E37276';
  case 'Aide à la jeunesse':
    return '#85C38E';
  case 'Jeunesse':
    return '#85C38E';
  case 'Justice':
    return '#BE80B6';
  case 'Recherche':
    return '#42A09E';
  case 'Sport':
    return '#ED9E41';
  case 'Sport et contrôle médico-sportif':
    return '#ED9E41';
  case 'Urgence Covid-19':
    return '#F2A900';
  default:
    return '#49508B';
  }
}