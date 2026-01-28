// Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { AttSelectOption } from "../../../shared/components/att-select";
import { useEffect, useState } from "react";
import { SELECTOR_CUSTOM_OPTION_EN } from "../../../shared/components/selector-custom-option/translate/en";

export interface IUseGetBandwidth {
  bandwidthOptions: AttSelectOption[];
}

interface IBandwidth {
  bandwidthValues: number[];
}

export function useGetBandwidth(): IUseGetBandwidth {
    const [bandwidthOptions, setBandwidth] = useState<AttSelectOption[]>([]);

    useEffect(() => {
      const data = [
        { label: '1', value: '1' },
        { label: '100', value: '100' },
        { label: '1000', value: '1000' }
      ];

      const bandwidthOptions: AttSelectOption[] = data.map((bandwidth) => ({ label: bandwidth.label, value: bandwidth.value }));
      setBandwidth([
        ...bandwidthOptions,
        { label: SELECTOR_CUSTOM_OPTION_EN.ADD_NEW, value: SELECTOR_CUSTOM_OPTION_EN.ADD_NEW, metadata: { isInput: true }},
        { label: SELECTOR_CUSTOM_OPTION_EN.ADD_NEW_BUTTON, value: SELECTOR_CUSTOM_OPTION_EN.ADD_NEW_BUTTON, metadata: { isAddNewButton: true }}
      ]);
    }, []);

    return { bandwidthOptions };
}
