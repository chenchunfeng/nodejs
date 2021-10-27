module.exports = function(playerAction) {
  const Action = ['rock','scissors', 'paper']
  if (playerAction && Action.includes(playerAction)) {
    // 电脑随机
    let computerAction = Action[Math.floor(Math.random() * 3)]
    if (playerAction === computerAction) {
      return 0
    } else {
      if (
        playerAction === 'rock' && computerAction === 'paper' || 
        playerAction === 'scissors' && computerAction === 'rock' || 
        playerAction === 'paper' && computerAction === 'scissors'
      ) {
        return -1
      } else {
        return 1
      }
    }
  } else {
    console.log('请输入rock | paper | scissors')
  }
}
