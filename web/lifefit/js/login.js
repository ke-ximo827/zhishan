// 登录模块
const button = document.querySelector(".submit")
const ck = document.querySelector(".checkbox")

// 登录用户名验证
const loginUsername = document.querySelector(".text")
const loginSpan = document.querySelector(".idvf2")
loginUsername.addEventListener("change", verifyLoginName)
function verifyLoginName() {
  const reg = /^[a-z0-9A-Z-_]{2,10}$/
  if (!reg.test(loginUsername.value)) {
    loginSpan.innerHTML = '输入不合法，请输入2-10位'
    loginSpan.style.color = 'rgb(170, 48, 48)'
    return false
  }
  loginSpan.innerHTML = '验证通过'
  loginSpan.style.color = 'rgb(19, 125, 47)'
  return true
}

// 登录密码验证
const loginPassword = document.querySelector(".password")
const loginPassSpan = loginPassword.nextElementSibling
loginPassword.addEventListener("change", verifyLoginPassword)
function verifyLoginPassword() {
  const reg = /^[a-z0-9A-Z-_]{6,20}$/
  if (!reg.test(loginPassword.value)) {
    loginPassSpan.innerHTML = '输入不合法，请输入6-20位'
    loginPassSpan.style.color = 'rgb(170, 48, 48)'
    return false
  }
  loginPassSpan.innerHTML = '验证通过'
  loginPassSpan.style.color = 'rgb(19, 125, 47)'
  return true
}


// 注册模块
// 注册用户名验证
const registerUsername = document.querySelector(".register_text")
const registerUserSpan = registerUsername.nextElementSibling
registerUsername.addEventListener("change", verifyRegisterName)
function verifyRegisterName() {
  const reg = /^[a-z0-9A-Z-_]{2,10}$/
  if (!reg.test(registerUsername.value)) {
    registerUserSpan.innerHTML = '输入不合法，请输入2-10位'
    registerUserSpan.style.color = 'rgb(170, 48, 48)'
    return false
  }
  registerUserSpan.innerHTML = '验证通过'
  registerUserSpan.style.color = 'rgb(19, 125, 47)'
  return true
}

// 注册密码验证
const registerPassword = document.querySelector(".register_password")
const registerPassSpan = registerPassword.nextElementSibling
registerPassword.addEventListener("change", verifyRegisterPassword)
function verifyRegisterPassword() {
  const reg = /^[a-z0-9A-Z-_]{6,20}$/
  if (!reg.test(registerPassword.value)) {
    registerPassSpan.innerHTML = '输入不合法，请输入6-20位'
    registerPassSpan.style.color = 'rgb(170, 48, 48)'
    return false
  }
  registerPassSpan.innerHTML = '验证通过'
  registerPassSpan.style.color = 'rgb(19, 125, 47)'
  return true
}

// 确认密码验证
const confirmPassword = document.querySelector(".register_password2")
const confirmSpan = confirmPassword.nextElementSibling
confirmPassword.addEventListener("change", verifyConfirmPassword)
function verifyConfirmPassword() {
  if (confirmPassword.value !== registerPassword.value) {
    confirmSpan.innerHTML = '两次密码不一致'
    confirmSpan.style.color = 'rgb(170, 48, 48)'
    return false
  }
  confirmSpan.innerHTML = '验证通过'
  confirmSpan.style.color = 'rgb(19, 125, 47)'
  return true
}
//验证手机号
//获取手机号表单
const phonenum = document.querySelector(".register_phone")
const span4 = phonenum.nextElementSibling
//值发生变化的时候
phonenum.addEventListener("change", verifyPhone)
function verifyPhone() {
  //定义规则
  const reg = /^1(\d|4[5-9]|56[567]|7[0-8]|8\d|9[0-35-9])\d{9}$/ //13开头\d0-9结尾中间8位
  if (!reg.test(phonenum.value)) {
    span4.innerHTML = '输入不合法，请输入11位13开头的电话号码'
    span4.style.color = 'rgb(170, 48, 48)' //合法的
    return false//直接跳出
  }
  span4.innerHTML = '验证通过'
  span4.style.color = 'rgb(19, 125, 47)' //合法的
  return true
}

// 验证码逻辑优化
let currentVerifyCode = ""; // 存储当前验证码
const vf_img = document.querySelector(".register_img")
const url = `https://www.mxnzp.com/api/verifycode/code?len=5&type=0&app_id=esccmsgnwtfjgznt&app_secret=CxR81TeDebuyxwvG4kGlWMO6kBiSK7xN`;
vf_img.addEventListener("click", function () {
  axios.get(url).then(result => {
    vf_img.src = result.data.data.verifyCodeImgUrl
    currentVerifyCode = result.data.data.verifyCode // 存储验证码
  })
})

// 验证码验证
const vfcode = document.querySelector(".register_vfcode")
const vfcodeSpan = vfcode.nextElementSibling
vfcode.addEventListener("change", function () {
  if (vfcode.value === currentVerifyCode) {
    vfcodeSpan.innerHTML = '验证通过'
    vfcodeSpan.style.color = 'rgb(19, 125, 47)'
  } else {
    vfcodeSpan.innerHTML = '验证码错误'
    vfcodeSpan.style.color = 'rgb(170, 48, 48)'
  }
})

// 注册提交优化
const submit = document.querySelector(".register_submit")
submit.addEventListener("click", function (e) {
  e.preventDefault()

  const isValid =
    verifyRegisterName() &&
    verifyRegisterPassword() &&
    verifyConfirmPassword() &&
    verifyPhone() &&
    vfcode.value === currentVerifyCode

  if (!isValid) {
    alert("请正确填写所有字段")
    return
  }

  const users = JSON.parse(localStorage.getItem("data")) || []
  const exists = users.some(user => user.username === registerUsername.value)

  if (exists) {
    alert("用户名已存在")
    return
  }

  users.push({
    username: registerUsername.value,
    password: registerPassword.value,
    tel: phonenum.value
  })

  localStorage.setItem("data", JSON.stringify(users))
  alert("注册成功")
  // 跳转到登录界面
  document.querySelector('.register').classList.remove('active')
  document.querySelector('.login').classList.add('active')
})
//将数据进行本地存储
const initData = [{
  username: 'DLlove12138',
  password: "20050316",
  tel: "13324569623"
}]
localStorage.setItem("data", JSON.stringify(initData))
// 切换逻辑
// 在login.js中添加切换逻辑
document.querySelector('.qiehuan').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.login').classList.remove('active');
  document.querySelector('.register').classList.add('active');
});

document.querySelector('.register_qiehuan').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.register').classList.remove('active');
  document.querySelector('.login').classList.add('active');
});

// 初始化显示登录表单
window.onload = () => {
  document.querySelector('.login').classList.add('active');
}
