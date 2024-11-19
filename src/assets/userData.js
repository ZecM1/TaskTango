export const userData = {
  poruka: '',
  username: 'johndoe',
  password: 'hashedpassword123',
  lastOpenedWorkdesk: 0,
  style: {
    fontFamily: 'var(--main-font)',
    fontSize: '1rem',
    width: '16rem',
    backgroundColor: 'green',
    backgroundImageUrl: "url('example-image.jpg')",
  },
  defaultStyle: {
    fontFamily: 'var(--main-font)',
    fontSize: '1rem',
    width: '16rem',
  },
  defaultWorkdesk: {
    name: 'Example Workdesk',
    path: '0',
    columns: [['Hello', 'My first task!', 'My Second task!']],
  },
  workdesks: [
    {
      name: 'Example Workdesk',
      path: '1',
      columns: [['Hello world!', 'My first task!', 'My Second task!']],
    },
  ],
};
