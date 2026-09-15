import { it, describe, expect } from "vitest";
import { getSettings, updateSettings } from "./settings.service.js";


describe("settings.service", () => {
    it("getSettings crea la configuracion con defaults si no existe", async () => {
        const settings = await getSettings();

        expect(settings).toBeDefined();
        expect(settings?.name).toBeTypeOf("string");
        expect(settings?.singleton).toBe(true);
    });

    it("getSettings devuelve siempre la misma fila (singleton)", async () => {
        const first = await getSettings();
        const second = await getSettings();

        expect(first?.id).toBe(second?.id);
    });

    it("updateSettings actualiza el nombre correctamente", async () => {
        const updated = await updateSettings({name: "Estetica Bella Tarija"});

        expect(updated?.name).toBe("Estetica Bella Tarija");
    });

    it("updateSettings no actualiza campos que no se mandan", async () => {
        await updateSettings({name : "Nombre Original"});
        const updated = await updateSettings({ primaryColor: "#ff0000"});

        expect(updated?.name).toBe("Nombre Original");
        expect(updated?.primaryColor).toBe("#ff0000");
    });
});
