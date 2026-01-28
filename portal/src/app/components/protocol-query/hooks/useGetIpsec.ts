// Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { AttSelectOption } from "../../../shared/components/att-select";
import { useEffect, useState } from "react";

export interface IUseGetIpsec {
  ipsecOptions: AttSelectOption[];
}

interface IIpsec {
  quantumSafe: string[];
}

export function useGetIpsec(): IUseGetIpsec {
    const [ipsecOptions, setIpsec] = useState<AttSelectOption[]>([]);

    useEffect(() => {
      const data = [
        { label: 'mlkem512', value: 'mlkem512' },
        { label: 'mlkem768', value: 'mlkem768' },
        { label: 'mlkem1024', value: 'mlkem1024' }
      ];

      const ipsecOptions: AttSelectOption[] = data.map((ipsec) => ({ label: ipsec.label, value: ipsec.value }));
      setIpsec([
        ...ipsecOptions
      ]);
    }, []);

    return { ipsecOptions };
}
