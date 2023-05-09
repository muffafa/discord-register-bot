import Code from "../../schemas/code.js";
import { ActionRowBuilder } from "discord.js";

import downloadsCodesButton from "../buttons/downloadCodes.js";
import codesEmbed from "../embeds/codes.js";

export default {
  data: {
    name: "createCodesScreen",
  },

  /**
   * @param {import("discord.js").ModalSubmitInteraction} interaction
   * @param {Client} client
   * @param {String} roleId
   */
  async execute(interaction, client, roleId) {
    // TODO: check if code number input is valid (is it a number?)

    const codeCount = parseInt(
      interaction.fields.getTextInputValue("codeNumberInput")
    );

    const codeInput = [];
    for (let i = 0; i < codeCount; i++) {
      codeInput.push(Math.floor(100000000 + Math.random() * 900000000));
    }

    const codes = await Code.addCodes(
      interaction.guildId,
      roleId,
      codeInput.map((code) => ({
        codeId: code,
      }))
    );
    const addedCodes = codes.inserted.map((code) => code.codeId);

    await interaction.reply({
      components: [
        new ActionRowBuilder().addComponents([downloadsCodesButton.generate()]),
      ],
      embeds: [codesEmbed.generate(client, addedCodes, [])],
    });
  },
};