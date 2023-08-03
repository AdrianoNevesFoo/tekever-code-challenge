export const getUserRoleMock = {
  attributes: {},
  clientRole: false,
  composite: false,
  containerId: "Teste",
  id: "f7ed1bfa-86ec-4cf7-89c5-90e9d05b6ddc",
  name: "USER",
};

export const getRoleByNameMock = {
  id: "f7ed1bfa-86ec-4cf7-89c5-90e9d05b6ddc",
  name: "USER",
  composite: false,
  clientRole: false,
  containerId: "Teste",
  attributes: {},
};

export const getAllRolesFromRealmMock = [
  {
    id: "97c2f998-dd89-4d40-b580-8a54cd7d59cb",
    name: "default-roles-teste",
    description: "${role_default-roles}",
    composite: true,
    clientRole: false,
    containerId: "Teste",
  },
  {
    id: "f7ed1bfa-86ec-4cf7-89c5-90e9d05b6ddc",
    name: "USER",
    composite: false,
    clientRole: false,
    containerId: "Teste",
  },
  {
    id: "0bdabf9f-5b94-4f25-bc42-c314a64f32bb",
    name: "ADMIN",
    composite: false,
    clientRole: false,
    containerId: "Teste",
  },
  {
    id: "b2eaa445-1bee-4805-b93e-ee75bb5524f0",
    name: "uma_authorization",
    description: "${role_uma_authorization}",
    composite: false,
    clientRole: false,
    containerId: "Teste",
  },
  {
    id: "339f598a-a196-4980-99ad-f16df9b2c92d",
    name: "offline_access",
    description: "${role_offline-access}",
    composite: false,
    clientRole: false,
    containerId: "Teste",
  },
];
