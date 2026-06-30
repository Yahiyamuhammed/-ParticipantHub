import participant from "@/mock/participants";

import {
  saveParticipant,
  clearParticipant,
} from "@/utils/storage";

async function login() {
  saveParticipant(participant);

  return participant;
}

async function logout() {
  clearParticipant();
}

export default {
  login,

  logout,
};