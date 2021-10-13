module.exports = function(playerAction) {
  console.log(playerAction);
  const Action = ['rock','scissors', 'paper']
  if (playerAction && Action.includes(playerAction)) {
    // 电脑随机
    let computerAction = Action[Math.floor(Math.random() * 3)]
    console.log('电脑出', computerAction)
    if (playerAction === computerAction) {
      console.log('平局')
      return 0
    } else {
      if (
        playerAction === 'rock' && computerAction === 'paper' || 
        playerAction === 'scissors' && computerAction === 'rock' || 
        playerAction === 'paper' && computerAction === 'scissors'
      ) {
        console.log('you lose')
        return -1
      } else {
        console.log('you win ')
        return 1
      }
    }
  } else {
    console.log('请输入rock | paper | scissors')
  }
}
