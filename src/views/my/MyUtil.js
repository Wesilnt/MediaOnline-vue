
var gradeMap = [
          {'key': -1, 'value':'未上学'},
          {'key': 0, 'value':'幼儿园'},
          {'key': 1, 'value':'一年级'},
          {'key': 2, 'value':'二年级'},
          {'key': 3, 'value':'三年级'},
          {'key':4, 'value':'四年级'},
          {'key':5, 'value':'五年级'},
          {'key':6, 'value':'六年级'},
          {'key':7, 'value':'初一'},
          {'key':8, 'value':'初二'},
          {'key':9, 'value':'初三'},
          {'key':10,'value':'初三以上'}
        ]

export function getGradeStr( num ) {
  for( let i= 0; i < gradeMap.length; i++ ){
    let key = gradeMap[i].key
    let value = gradeMap[i].value
    if(num === key ) {
      return value
    }
  }
}
export function getGradeNum( str ) {
  for( let i= 0; i < gradeMap.length; i++ ){
    let key = gradeMap[i].key
    let value = gradeMap[i].value
    if(value === str ) {
      return key
    }
  }
}
